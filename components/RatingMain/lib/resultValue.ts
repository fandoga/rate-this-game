import { useMemo } from "react";

type Keys = "Story" | "Visual" | "Gameplay" | "Tech" | "Sub";

export const getResultValue = ({
  Story,
  Visual,
  Gameplay,
  Tech,
  Sub,
}: Record<Keys, number>) => {
  const resultValue: number = useMemo(() => {
    return Math.floor((Story + Visual + Gameplay + Tech) * 1.4 + Sub * 4.4);
  }, [Story, Visual, Gameplay, Tech, Sub]);

  return resultValue;
};
