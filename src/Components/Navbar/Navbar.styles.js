import tw from "tailwind-styled-components";

export const Main = tw.div`
    px-6
    flex
    justify-between
`;

export const IconBar = tw.div`
    flex
    items-center
`;

export const Icon = tw.div`
    ml-8
    cursor-pointer
`;

export const Search = tw.input`
    w-5/12
    px-6
    py-2
    neumorphism-outer
    rounded-3xl
    bg-[color:var(--color-bg-input)]
    outline-none
`;
