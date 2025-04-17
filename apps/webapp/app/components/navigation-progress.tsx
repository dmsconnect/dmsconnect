import asymptoticFunction from "@/utils/asymptoticFunction";
import { Progress } from "@dmsconnect/ui/progress";
import { useEffect, useRef, useState } from "react";
import { useNavigation } from "react-router";

function NavigationProgress() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
  const intervalRef = useRef<NodeJS.Timeout>(null);
  const [incrementCount, setIncrementCount] = useState(0);

  const startCounter = () => {
    setIncrementCount(0);
    intervalRef.current = setInterval(() => {
      setIncrementCount((count) => count + 1);
    }, 100);
  };

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (isNavigating) {
      startCounter();
    } else {
      stopCounter();
    }
    return () => {
      stopCounter();
    };
  }, [isNavigating]);
  return (
    <Progress
      className="h-0.5"
      value={isNavigating ? asymptoticFunction(incrementCount) : 100}
    />
  );
}

export default NavigationProgress;
