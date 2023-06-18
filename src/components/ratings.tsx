import { HTMLAttributes, useEffect, useState } from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { Text } from "@mantine/core";

interface RatingsProps extends HTMLAttributes<HTMLDivElement> {
  total: number;
  rating: number;
  votes: number;
  stars: number;
}

export const Ratings = ({ rating, total, stars, votes, className, ...rest }: RatingsProps) => {
  const [ranges, setRanges] = useState<[number, number][]>([]);

  useEffect(() => {
    const interval = total / stars;
    const ranges: [number, number][] = [];

    for (let i = 0; i < stars; i++) {
      ranges.push([i * interval, (i + 1) * interval]);
    }

    setRanges(ranges);
  }, [total, stars]);

  return (
    <div className={`${className || ""} flex items-center gap-2`} {...rest}>
      {ranges.map(([start, end]) => {
        if (rating <= start) return <BsStar key={start} />;
        else if (start < rating && rating <= end) return <BsStarHalf key={start} />;
        return <BsStarFill key={start} />;
      })}

      <Text className="leading-none" size="lg">
        <strong>{rating}</strong> / {total} from <strong>{votes} votes</strong>
      </Text>
    </div>
  );
};
