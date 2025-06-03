import { useMutation } from "@urql/vue";
import { ref } from "vue";

import { graphql } from "@/gql";
import { DummyMutationDocument } from "@/gql/graphql.ts";

graphql(`
  mutation DummyMutation {
    dummyFunction {
      __typename
    }
  }
`);

export const useRefreshData = () => {
  const dummyMutation = useMutation(DummyMutationDocument);
  const isRefreshing = ref(false);

  const refreshData = async (): Promise<void> => {
    isRefreshing.value = true;
    await dummyMutation.executeMutation({}, { additionalTypenames: ["All"] });
    isRefreshing.value = false;
  };

  return { isRefreshing, refreshData };
};
