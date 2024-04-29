import { invoke } from "../../runtime.ts";
import { clx } from "../../sdk/clx.ts";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  content: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: Form;
  };
  layout?: {
    tiled?: boolean;
  };
}

function Newsletter(
  { content, layout = {} }: Props,
) {
  const { tiled = false } = layout;
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await invoke.vtex.actions.newsletter.subscribe({ email });
    } finally {
      loading.value = false;
    }
  };

  return (
    <div
      class={clx(
        "flex flex-col gap-4 bg-[#F5F5F5] p-10 max-w-96",
      )}
    >
      <div class="flex flex-col gap-4 text-center">
        {content?.title && (
          <h4
            class={tiled
              ? "text-2xl lg:text-3xl text-[#1A1A1A]"
              : "text-lg text-[#1A1A1A] text-center"}
          >
            {content?.title}
          </h4>
        )}
        {content?.description && <div>{content?.description}</div>}
      </div>
      <div class="flex flex-col gap-4">
        <form
          class="form-control"
          onSubmit={handleSubmit}
        >
          <div class="flex flex-wrap gap-3">
            <input
              name="nome"
              class="flex-auto md:flex-none input input-bordered md:w-80 text-base-content"
              placeholder={content?.form?.placeholder || "Nome"}
            />
            <input
              name="email"
              class="flex-auto md:flex-none input input-bordered md:w-80 text-base-content"
              placeholder={content?.form?.placeholder || "E-mail"}
            />
            <button
              type="submit"
              class="btn disabled:loading bg-[#E9177C] text-[#FFFFFF] w-full"
              disabled={loading}
            >
              {content?.form?.buttonText || "Enivar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Newsletter;
