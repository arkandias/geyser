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
  query GetAssignments($year: Int!, $where: RequestBoolExp = {}) {
    assignments: request(
      where: {
        _and: [
          { service: { yearValue: { _eq: $year } } }
          { type: { _eq: ASSIGNMENT } }
          $where
        ]
      }
      orderBy: [
        { course: { program: { degree: { name: ASC } } } }
        { course: { program: { name: ASC } } }
        { course: { track: { name: ASC } } }
        { course: { semester: ASC } }
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
        semester
        type {
          label
        }
      }
      service: vService {
        teacher: vTeacher {
          uid
          displayname
        }
      }
    }
  }
`);

export const useDownloadAssignments = () => {
  const client = useClientHandle().client;
  const { t } = useTypedI18n();
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
      [t("downloadAssignments.course")]: a.course.name,
      [t("downloadAssignments.semester")]: a.course.semester,
      [t("downloadAssignments.type")]: a.course.type.label,
      [t("downloadAssignments.teacher")]: a.service?.teacher?.displayname,
      [t("downloadAssignments.email")]: a.service?.teacher?.uid,
    }));

    try {
      downloadCSV(filename, formattedAssignments);
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
