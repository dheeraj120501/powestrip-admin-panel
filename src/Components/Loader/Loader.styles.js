import tw from "tailwind-styled-components";

const LoaderBall = tw.div`
  m-2 
  w-4 
  h-4 
  rounded-full 
  animate-bounce
`;

export const Ball1 = tw(LoaderBall)`
bg-blue-600 
  anim-delay-1
`;

export const Ball2 = tw(LoaderBall)`
bg-green-600 
  anim-delay-2
`;

export const Ball3 = tw(LoaderBall)`
bg-red-600 
  anim-delay-2
`;
