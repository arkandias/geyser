import { errorMessage } from "@geyser/shared";
import { useClientHandle } from "@urql/vue";

import { NotifyType, useNotify } from "@/composables/useNotify.ts";
import { useTypedI18n } from "@/composables/useTypedI18n.ts";
import { graphql } from "@/gql";
import {
  GetAssignmentsDocument,
  type GetAssignmentsQueryVariables,
} from "@/gql/graphql.ts";
import { downloadCSV } from "@/utils";

graphql(`
  query GetAssignments($oid: Int!, $year: Int!, $where: RequestBoolExp = {}) {
    assignments: request(
      where: {
        _and: [
          { oid: { _eq: $oid } }
          { service: { year: { _eq: $year } } }
          { type: { _eq: ASSIGNMENT } }
          $where
        ]
      }
      orderBy: [
        { course: { program: { degree: { name: ASC } } } }
        { course: { program: { name: ASC } } }
        { course: { term: { label: ASC } } }
        { course: { track: { name: ASC } } }
        { course: { name: ASC } }
        { course: { type: { label: ASC } } }
        { service: { teacher: { lastname: ASC } } }
        { service: { teacher: { firstname: ASC } } }
      ]
    ) {
      course {
        name: nameDisplay
        program {
          name: nameDisplay
          degree {
            name: nameDisplay
          }
        }
        track {
          name: nameDisplay
          program {
            name: nameDisplay
            degree {
              name: nameDisplay
            }
          }
        }
        term {
          label
        }
        type {
          label
        }
        hoursPerGroup: hoursEffective
      }
      service {
        teacher {
          displayname
          email
          position {
            label
          }
        }
      }
      hours
      hoursWeighted
    }
  }
`);

export const useDownloadAssignments = () => {
  const { t } = useTypedI18n();
  const client = useClientHandle().client;
  const { notify } = useNotify();

  const downloadAssignments = async (
    variables: GetAssignmentsQueryVariables,
    filename: string,
  ) => {
    const { data, error } = await client
      .query(GetAssignmentsDocument, variables, {
        requestPolicy: "network-only",
      })
      .toPromise();

    if (error || !data?.assignments) {
      notify(NotifyType.Error, {
        message: t("downloadAssignments.error.requestFailed"),
        caption: error
          ? error.message
          : t("downloadAssignments.error.unknownError"),
      });
      return;
    }

    const formattedAssignments = data.assignments.map((a) => ({
      [t("downloadAssignments.program")]:
        `${a.course.program.degree.name} ${a.course.program.name}`,
      [t("downloadAssignments.track")]: a.course.track
        ? a.course.track.name
        : null,
      [t("downloadAssignments.term")]: a.course.term.label,
      [t("downloadAssignments.course")]: a.course.name,
      [t("downloadAssignments.type")]: a.course.type.label,
      [t("downloadAssignments.teacher")]: a.service.teacher.displayname,
      [t("downloadAssignments.email")]: a.service.teacher.email,
      [t("downloadAssignments.position")]: a.service.teacher.position?.label,
      [t("downloadAssignments.groupsAssigned")]:
        Math.round((a.hours / (a.course.hoursPerGroup ?? 0)) * 100) / 100,
      [t("downloadAssignments.hoursAssigned")]: Math.round(a.hours * 100) / 100,
      [t("downloadAssignments.hoursWeightedAssigned")]:
        Math.round((a.hoursWeighted ?? 0) * 100) / 100,
    }));

    try {
      downloadCSV(formattedAssignments, filename);
    } catch (error) {
      notify(NotifyType.Error, {
        message: t("downloadAssignments.error.downloadFailed"),
        caption: errorMessage(
          error,
          t("downloadAssignments.error.unknownError"),
        ),
      });
    }
  };

  return { downloadAssignments };
};
