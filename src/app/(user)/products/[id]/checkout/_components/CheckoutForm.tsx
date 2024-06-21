"use client";

import { userOrderExists } from "@/app/actions/orders";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { FormEvent, useState } from "react";
// import { FormEvent, Suspense, useState } from "react";
// import { Skeleton } from "@/components/ui/skeleton";

type CheckoutFormProps = {
  product: {
    id: string;
    imagePath: string;
    name: string;
    priceInCents: number;
    description: string;
  };
  clientSecret: string;
};

// const appearance = {
//   variables: {
//     fontFamily: "Inter, sans-serif",
//     colorText: "text-primary",
//   },
//   rules: {
//     ".Input": {
//       border: "1px solid #E2E8F0",
//       borderRadius: "0.375rem",
//     },
//     ".Input:focus": {
//       borderColor: "border-input",
//       boxShadow: "none",
//     },
//   },
// };

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export function CheckoutForm({ product, clientSecret }: CheckoutFormProps) {
  return (
    // <div className="max-w-5xl w-full mx-auto space-y-8">
    <div className="max-w-5xl w-full mx-auto space-y-8 pt-4 pb-8">
      <div className="flex gap-4 items-center">
        <div className="aspect-video flex-shrink-0 w-1/3 relative">
          <Image
            src={product.imagePath}
            fill
            alt={product.name}
            className="object-cover"
          />
        </div>
        <div>
          {/* <div className="text-lg"> */}
          <div className="text-2xl pb-4 font-medium">
            {formatCurrency(product.priceInCents / 100)}
          </div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="line-clamp-3 text-muted-foreground">
            {product.description}
          </div>
        </div>
      </div>
      <Elements options={{ clientSecret }} stripe={stripePromise}>
        {/* <Elements options={{ clientSecret, appearance }} stripe={stripePromise}> */}
        <Form priceInCents={product.priceInCents} productId={product.id} />
      </Elements>
    </div>
  );
}

function Form({
  priceInCents,
  productId,
}: {
  priceInCents: number;
  productId: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [email, setEmail] = useState<string>();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (stripe == null || elements == null || email == null) return;

    setIsLoading(true);

    const orderExists = await userOrderExists(email, productId);

    if (orderExists) {
      setErrorMessage(
        "You have already purchased this product. Try downloading it from the My Orders page"
      );
      setIsLoading(false);
      return;
    }

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/success`,
          // return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/confirmation`,
        },
      })
      .then(({ error }) => {
        if (error.type === "card_error" || error.type === "validation_error") {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("An unknown error occurred");
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          {errorMessage && (
            <CardDescription className="text-destructive">
              {errorMessage}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <PaymentElement />
          {/* <Skeleton className="w-full h-12 rounded-md bg-gray-300">
            <PaymentElement />
          </Skeleton> */}
          <div className="mt-4">
            <LinkAuthenticationElement
              onChange={(e) => setEmail(e.value.email)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            size="lg"
            disabled={stripe == null || elements == null || isLoading}
          >
            {/* {isLoading ? "Purchasing..." : `Purchase - ${formatCurrency(priceInCents / 100)}`} */}
            {isLoading ? "Processing..." : `Pay`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

// <Suspense
//   fallback={
//     <>
//       <ElementCardSkeleton />
//       <ElementCardSkeleton />
//     </>
//   }
// >
//   <ElementSuspense elementsFetcher={elementsFetcher} />
// </Suspense>

// async function ElementSuspense({
//   elementsFetcher,
// }: {
//   elementsFetcher: () => Promise<Element[]>;
// }) {
//   return (await elementsFetcher()).map((element) => (
//     <ElementCard />
//   ));
// }
