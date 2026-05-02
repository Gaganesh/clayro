"use client";

import {
  ADMIN_CATEGORY_VALUES,
  canonicalCategoryForAdmin,
  categoryOptionsForAdminFlat,
} from "@/constants/catalog";

type Props = {
  /** Omit for “Add product”; set on edit so legacy rows stay selectable. */
  savedCategory?: string;
};

/** Category as radios (plain div, not `<fieldset>` — avoids UA/preflight layout quirks). */
export default function AdminCategoryField({ savedCategory }: Props) {
  const names =
    savedCategory === undefined
      ? ([...ADMIN_CATEGORY_VALUES] as string[])
      : categoryOptionsForAdminFlat(savedCategory);

  const current =
    savedCategory !== undefined ? canonicalCategoryForAdmin(savedCategory) : "";

  if (names.length === 0) {
    return (
      <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
        Categories failed to load. Refresh the page; if this persists, check the
        build.
      </p>
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label="Product category"
      className="rounded-lg border-2 border-gray-300 bg-white p-4 text-gray-900 shadow-sm outline-none"
    >
      <p className="mb-4 text-base font-semibold tracking-tight text-gray-950">
        Category{" "}
        <span className="font-normal text-gray-600">— choose one</span>
      </p>
      <div className="flex flex-col gap-3.5">
        {names.map((name, idx) => (
          <label
            key={`${idx}-${name}`}
            className="flex cursor-pointer items-start gap-3 text-[15px] leading-snug"
          >
            <input
              type="radio"
              name="category"
              value={name}
              required={idx === 0}
              defaultChecked={
                savedCategory !== undefined && current === name
              }
              className="mt-1 h-[1.125rem] w-[1.125rem] shrink-0 cursor-pointer rounded-full border border-gray-400 accent-zinc-900"
            />
            <span className="font-medium text-gray-900 pt-px">{name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
