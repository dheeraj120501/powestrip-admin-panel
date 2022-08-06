import tw from "tailwind-styled-components";

export const Layout = tw.div`
    flex
    w-full
    h-screen
`;

export const Main = tw.div` 
    flex
    flex-col
    py-8
    flex-1
`;

export const MainContent = tw.div`
    px-6
    mt-6
    flex-1
    customScrollbar
    overflow-y-auto
`;
