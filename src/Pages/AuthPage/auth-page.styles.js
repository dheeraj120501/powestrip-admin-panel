import tw from "tailwind-styled-components";

export const Main = tw.div`
    w-full
    h-screen
    flex
    flex-col
    p-16
`;

export const Logo = tw.div`
    w-[14%]
    object-contain
`;

export const Login = tw.div`
    mt-16
    flex
    justify-between
    items-center
`;

export const Illustrations = tw.div`
    flex
    flex-col
    items-center
    justify-center
    px-20
`;

export const IllustrationsContent = tw.div`
    mt-6
    font-bold
    text-3xl
`;

export const Form = tw.form`
    p-12
    bg-[color:var(--color-bg-primary)]
    neumorphism-outer
    rounded-lg
`;

export const FormCaption = tw.div`
   text-center
   mb-12
   text-3xl
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

const Btn = tw.button`
    px-8
    py-2
    rounded-lg
    mt-8
    border-2
    border-[color:var(--color-btn)]
    font-bold
    outline-none
    hover:cursor-pointer
`;

export const PrimaryBtn = tw(Btn)`
    bg-[color:var(--color-btn)]
    w-full
    text-black
    hover:bg-transparent
    hover:text-[color:var(--color-btn)]
`;

export const SecondaryBtn = tw(Btn)`
    bg-transparent
    text-[color:var(--color-btn)]
    hover:bg-[color:var(--color-btn)]
    hover:text-black
`;
