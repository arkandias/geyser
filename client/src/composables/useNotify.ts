import { type QNotifyCreateOptions, useQuasar } from "quasar";

export enum NotifyType {
  Default,
  Error,
  Success,
}

const commonProps: QNotifyCreateOptions = {
  position: "bottom-right",
  group: false,
};

const defaultOptions = (type: NotifyType): QNotifyCreateOptions => {
  switch (type) {
    case NotifyType.Default:
      return {
        ...commonProps,
        color: "info",
      };
    case NotifyType.Error:
      return {
        ...commonProps,
        color: "negative",
      };
    case NotifyType.Success:
      return {
        ...commonProps,
        color: "positive",
      };
  }
};

export const useNotify = () => {
  const $q = useQuasar();

  const notify = (type: NotifyType, opts: QNotifyCreateOptions) => {
    $q.notify({ ...defaultOptions(type), ...opts });
  };

  return { notify };
};
