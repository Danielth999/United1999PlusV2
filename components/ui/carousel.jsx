"use client";
import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";

const CarouselContext = React.createContext(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

const Carousel = React.forwardRef(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const onSelect = React.useCallback((api) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
      setSelectedIndex(api.selectedScrollSnap());
    }, []);

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          canScrollPrev,
          canScrollNext,
          selectedIndex,
        }}
      >
        <div
          ref={ref}
          className={`relative ${className}`}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={`flex ${orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col"} ${className}`}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={`min-w-0 shrink-0 grow-0 basis-full ${orientation === "horizontal" ? "pl-4" : "pt-4"} ${className}`}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

const CarouselIndicators = () => {
  const { api, selectedIndex } = useCarousel();
  const slideCount = api ? api.scrollSnapList().length : 0;

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
      {Array.from({ length: slideCount }).map((_, index) => (
        <button
          key={index}
          className={`indicator ${index === selectedIndex ? 'active' : ''}`}
          onClick={() => api.scrollTo(index)}
        />
      ))}
    </div>
  );
};

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselIndicators,
};
