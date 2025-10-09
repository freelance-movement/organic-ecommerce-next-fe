import { ShoppingBasket, Handshake, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";

const ctaBlocks = [
  {
    id: 1,
    icon: ShoppingBasket,
    title: "Explore Our Store",
    description:
      "Browse our diverse collection of organic products, carefully selected from all over the country.",
    buttonText: "Go to Store",
    buttonColor: "bg-viet-green-dark hover:bg-viet-green-medium",
    iconBg: "bg-viet-green-medium",
  },
  {
    id: 2,
    icon: Handshake,
    title: "Become a Partner",
    description:
      "Are you a farmer or an organic co-op? Join VietRoot in celebrating the value of Vietnamese produce.",
    buttonText: "Learn About Partnership",
    buttonColor: "bg-viet-earth-gold hover:bg-viet-earth-orange",
    iconBg: "bg-viet-earth-gold",
  },
  {
    id: 3,
    icon: Sprout,
    title: "VietRoot's Journal",
    description:
      "Read our stories about farmers, cultivation processes, and healthy recipes.",
    buttonText: "Read More",
    buttonColor: "bg-viet-green-light hover:bg-viet-green-medium",
    iconBg: "bg-viet-green-light",
  },
];

export default function CallToActionBlocks() {
  return (
    <section className="pt-16 pb-12 md:pt-18 md:pb-18 bg-white">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ctaBlocks.map((block) => {
            const IconComponent = block.icon;
            return (
              <div
                key={block.id}
                className="text-center p-8 bg-viet-earth-cream rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                data-testid={`cta-block-${block.id}`}
              >
                <div
                  className={`${block.iconBg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl`}
                >
                  <IconComponent
                    className="h-8 w-8"
                    data-testid={`icon-cta-${block.id}`}
                  />
                </div>
                <h3
                  className="text-xl font-semibold text-viet-green-dark mb-4"
                  data-testid={`text-cta-title-${block.id}`}
                >
                  {block.title}
                </h3>
                <p
                  className="text-gray-600 mb-6 leading-relaxed"
                  data-testid={`text-cta-description-${block.id}`}
                >
                  {block.description}
                </p>
                <Button
                  className={`${block.buttonColor} text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200`}
                  data-testid={`button-cta-${block.id}`}
                >
                  {block.buttonText}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
