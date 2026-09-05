import type { Icon } from "@phosphor-icons/react";
import { AlignBottomIcon } from "@phosphor-icons/react/dist/csr/AlignBottom";
import { ArrowBendUpRightIcon } from "@phosphor-icons/react/dist/csr/ArrowBendUpRight";
import { BookBookmarkIcon } from "@phosphor-icons/react/dist/csr/BookBookmark";
import { BrowserIcon } from "@phosphor-icons/react/dist/csr/Browser";
import { ChatCircleIcon } from "@phosphor-icons/react/dist/csr/ChatCircle";
import { FileIcon } from "@phosphor-icons/react/dist/csr/File";
import { FileTextIcon } from "@phosphor-icons/react/dist/csr/FileText";
import { GearIcon } from "@phosphor-icons/react/dist/csr/Gear";
import { HouseIcon } from "@phosphor-icons/react/dist/csr/House";
import { SlidersHorizontalIcon } from "@phosphor-icons/react/dist/csr/SlidersHorizontal";
import { UserIcon } from "@phosphor-icons/react/dist/csr/User";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import type {
  StructureBuilder,
  StructureResolverContext,
} from "sanity/structure";

import { createSlugBasedStructure } from "@/components/nested-pages-structure";
import type { SchemaType, SingletonType } from "@/schemaTypes/index";
import { getTitleCase } from "@/utils/helper";

type Base<T = SchemaType> = {
  id?: string;
  type: T;
  preview?: boolean;
  title?: string;
  icon?: Icon;
};

type CreateSingleTon = {
  S: StructureBuilder;
} & Base<SingletonType>;

const createSingleTon = ({ S, type, title, icon }: CreateSingleTon) => {
  const newTitle = title ?? getTitleCase(type);
  return S.listItem()
    .title(newTitle)
    .icon(icon ?? FileIcon)
    .child(S.document().schemaType(type).documentId(type));
};

type CreateList = {
  S: StructureBuilder;
} & Base;

const createList = ({ S, type, icon, title, id }: CreateList) => {
  const newTitle = title ?? getTitleCase(type);
  return S.documentTypeListItem(type)
    .id(id ?? type)
    .title(newTitle)
    .icon(icon ?? FileIcon);
};

type CreateIndexList = {
  S: StructureBuilder;
  list: Base;
  index: Base<SingletonType>;
  context: StructureResolverContext;
};

const createIndexListWithOrderableItems = ({
  S,
  index,
  list,
  context,
}: CreateIndexList) => {
  const indexTitle = index.title ?? getTitleCase(index.type);
  const listTitle = list.title ?? getTitleCase(list.type);
  return S.listItem()
    .title(listTitle)
    .icon(index.icon ?? FileIcon)
    .child(
      S.list()
        .title(indexTitle)
        .items([
          S.listItem()
            .title(indexTitle)
            .icon(index.icon ?? FileIcon)
            .child(
              S.document()
                .views([S.view.form()])
                .schemaType(index.type)
                .documentId(index.type)
            ),
          orderableDocumentListDeskItem({
            type: list.type,
            S,
            context,
            icon: list.icon ?? FileIcon,
            title: `${listTitle}`,
          }),
        ])
    );
};

export const structure = (
  S: StructureBuilder,
  context: StructureResolverContext
) =>
  S.list()
    .title("Content")
    .items([
      createSingleTon({ S, type: "homePage", icon: HouseIcon }),
      S.divider(),
      createSlugBasedStructure(S, "page"),
      createIndexListWithOrderableItems({
        S,
        index: { type: "blogIndex", icon: BookBookmarkIcon },
        list: { type: "blog", title: "Blogs", icon: FileTextIcon },
        context,
      }),
      createList({
        S,
        type: "faq",
        title: "FAQs",
        icon: ChatCircleIcon,
      }),
      createList({ S, type: "author", title: "Authors", icon: UserIcon }),
      createList({
        S,
        type: "redirect",
        title: "Redirects",
        icon: ArrowBendUpRightIcon,
      }),
      S.divider(),
      S.listItem()
        .title("Site Configuration")
        .icon(SlidersHorizontalIcon)
        .child(
          S.list()
            .title("Site Configuration")
            .items([
              createSingleTon({
                S,
                type: "navbar",
                title: "Navigation",
                icon: BrowserIcon,
              }),
              createSingleTon({
                S,
                type: "footer",
                title: "Footer",
                icon: AlignBottomIcon,
              }),
              createSingleTon({
                S,
                type: "settings",
                title: "Global Settings",
                icon: GearIcon,
              }),
            ])
        ),
    ]);
