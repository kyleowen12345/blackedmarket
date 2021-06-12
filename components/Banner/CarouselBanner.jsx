import React, { useRef, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
0% { opacity:0; }
100% { opacity:1; }
`;

const arr = [
  { show: "block", url: "https://cf.shopee.ph/file/f02c278c5df1aedabd30ee3677fea56b" },
  { show: "none", url: "https://cf.shopee.ph/file/5b9c7f4b70eb3e423cf92fe51acc011e" },
  { show: "none", url: "https://source.unsplash.com/6ccJQ5qPFvY/1440x960" },
  { show: "none", url: "https://source.unsplash.com/qTLyiHW1nIc/1440x960" },
  { show: "none", url: "https://source.unsplash.com/fxX__3GRtsg/1440x960" }
];


const CarouselBanner = () => {
  const [value, setValue] = React.useState(1);
  const [delay, setDelay] = React.useState(5000);
  
  useInterval(() => {
    // Your custom logic here
    value === 4 ? setValue(1) : setValue(value +1);
    arr.map(i => {
      return (i.show = "none");
    });
    arr[value].show = "block";
  }, delay);
  return (
    <>
      <div>
        {arr.map((item, key) => {
          return (
            <Box
              backgroundColor="#222"
              backgroundImage={`url(${item.url})`}
              backgroundPosition="center"
              backgroundSize="cover"
              backgroundRepeat="no-repeat"
              width={"40vw"}
              height="30vh"
              animation={`${fadeIn} ease 3s`}
              display={item.show}
              key={key}
              paddingTop={5}
             
            >
            </Box>
          );
        })}
      </div>
    </>
  );
}
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default CarouselBanner
