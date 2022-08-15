// TypeScript users only add this code
import { BaseEditor, BaseElement, BaseNode, Descendant } from "slate";
import { ReactEditor, RenderLeafProps } from "slate-react";

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element:
      | (BaseElement & {
          type: string;
        })
      | ImageElement;
    Node: BaseNode & {
      type: string;
    };
    Text: {
      type: string;
      bold?: boolean;
      code?: boolean;
      italic?: boolean;
      underline?: boolean;
      kbd: boolean;
    };
  }
}

export type ImageElement = {
  type: "image";
  url: string;
  children: EmptyText[];
};
export type EmptyText = {
  text: string;
};

declare module "virtual:pwa-register/react" {
  // @ts-expect-error ignore when react is not installed
  import type { Dispatch, SetStateAction } from "react";

  export interface RegisterSWOptions {
    immediate?: boolean;
    onNeedRefresh?: () => void;
    onOfflineReady?: () => void;
    onRegistered?: (
      registration: ServiceWorkerRegistration | undefined
    ) => void;
    onRegisterError?: (error: any) => void;
  }

  export function useRegisterSW(options?: RegisterSWOptions): {
    needRefresh: [boolean, Dispatch<SetStateAction<boolean>>];
    offlineReady: [boolean, Dispatch<SetStateAction<boolean>>];
    updateServiceWorker: (reloadPage?: boolean) => Promise<void>;
  };
}
