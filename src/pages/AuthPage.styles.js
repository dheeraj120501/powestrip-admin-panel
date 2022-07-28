import tw from "tailwind-styled-components";

export const Main = tw.div`
    w-full
    h-screen
    bg-[image:var(--gradient-bg)]
    flex
    flex-col
    justify-center
    items-center
`;

export const Form = tw.form`
    w-4/12
    p-12
    bg-[color:var(--color-bg-primary)]
    neumorphism-outer
    rounded-lg
`;

export const FormCaption = tw.div`
   text-center
   mb-12
   text-2xl
   font-bold
`;

export const Input = tw.input`
    w-full
    outline-none
    bg-transparent
    neumorphism-inner
    py-4
    px-6
    rounded-lg
    mb-6
`;

export const FormAction = tw.div`
    flex
    justify-between
    items-center
`;

const Btn = tw.div`
    px-8
    py-2
    rounded-lg
    mt-8
    border-2
    font-bold
    hover:cursor-pointer
`;

export const PrimaryBtn = tw(Btn)`
    bg-[color:var(--color-btn)]
    text-black
    hover:bg-transparent
    hover:border-[color:var(--color-btn)]
    hover:text-[color:var(--color-btn)]
`;

export const SecondaryBtn = tw(Btn)`
    bg-transparent
    border-[color:var(--color-btn)]
    text-[color:var(--color-btn)]
    hover:bg-[color:var(--color-btn)]
    hover:text-black
`;
