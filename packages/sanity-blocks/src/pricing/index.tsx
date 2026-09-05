import { BlockHeader } from "@workspace/sanity-blocks/internal/block-header";
import {
  type ButtonProps,
  SanityButtons,
} from "@workspace/sanity-blocks/internal/sanity-buttons";
import { cn } from "@workspace/tailwind-config/utils";

export interface PricingPlan {
  _key?: string | null;
  name?: string | null;
  description?: string | null;
  priceLabel?: string | null;
  billingLabel?: string | null;
  features?: string[] | null;
  featured?: boolean | null;
  badge?: string | null;
  buttons?: ButtonProps[] | null;
}

export interface PricingProps {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  plans?: PricingPlan[] | null;
  footnote?: string | null;
}

export function Pricing({
  eyebrow,
  title,
  description,
  plans,
  footnote,
}: Readonly<PricingProps>) {
  const cards = plans ?? [];
  return (
    <section className="block-section">
      <div className="container grid gap-10">
        <BlockHeader eyebrow={eyebrow} title={title}>
          {description ? (
            <p className="max-w-2xl whitespace-pre-line text-muted-foreground text-lg">
              {description}
            </p>
          ) : null}
        </BlockHeader>
        {cards.length ? (
          <div
            className={cn(
              "grid gap-6",
              cards.length === 2 && "md:grid-cols-2",
              cards.length >= 3 && "md:grid-cols-3"
            )}
          >
            {cards.map((plan, index) => (
              <PricingCard key={plan._key ?? index} plan={plan} />
            ))}
          </div>
        ) : null}
        {footnote ? (
          <p className="whitespace-pre-line text-muted-foreground text-sm">
            {footnote}
          </p>
        ) : null}
      </div>
    </section>
  );
}

function PricingCard({ plan }: Readonly<{ plan: PricingPlan }>) {
  return (
    <article
      className={cn(
        "flex min-w-0 flex-col gap-6 rounded-2xl border bg-card p-6 text-card-foreground sm:p-8",
        plan.featured && "border-primary ring-1 ring-primary"
      )}
    >
      <div className="grid gap-3">
        {plan.badge ? (
          <p className="w-fit rounded-full bg-muted px-3 py-1 font-medium text-sm">
            {plan.badge}
          </p>
        ) : null}
        {plan.name ? (
          <h3 className="break-words font-semibold text-2xl">{plan.name}</h3>
        ) : null}
        {plan.description ? (
          <p className="whitespace-pre-line text-muted-foreground">
            {plan.description}
          </p>
        ) : null}
      </div>
      {plan.priceLabel ? (
        <p className="break-words">
          <span className="font-semibold text-4xl tracking-tight">
            {plan.priceLabel}
          </span>
          {plan.billingLabel ? (
            <>
              {" "}
              <span className="text-muted-foreground">{plan.billingLabel}</span>
            </>
          ) : null}
        </p>
      ) : null}
      <PricingFeatures features={plan.features} />
      <SanityButtons
        buttons={plan.buttons}
        className="mt-auto"
        buttonClassName="w-full"
      />
    </article>
  );
}

function PricingFeatures({
  features,
}: Readonly<{ features: PricingPlan["features"] }>) {
  if (!features?.length) return null;
  return (
    <ul className="grid gap-3">
      {features.map((feature) => (
        <li className="flex items-start gap-3" key={feature}>
          <span aria-hidden="true" className="text-primary">
            ✓
          </span>
          <span className="min-w-0 break-words">{feature}</span>
        </li>
      ))}
    </ul>
  );
}
