import tw from "tailwind-styled-components";

export const Main = tw.div`
    px-12
    py-8
    h-screen
    inline-flex
    flex-col
    justify-between
    items-center
    bg-[color:var(--color-bg-primary)]
`;

export const Btn = tw.div`
    w-full
    py-3
    neumorphism-outer
    rounded-md
    flex
    items-center
    justify-center
    mt-6
    mb-4
    cursor-pointer
`;

export const BtnIcon = tw.div`
    h-full
    flex
    bg-[color:#1fa7fe]
    rounded-[50%]
    px-1.5
    justify-center
    items-center
    mr-2
`;

export const Avatar = tw.div`
    w-full
    flex
    justify-center
    object-contain
`;

export const Card = tw.div`
    neumorphism-outer
    w-full
    
    flex
    flex-col
    items-center
    px-9
    pb-5
    rounded-lg
`;

export const CardImg = tw.div`
    w-20
    h-20
    relative
    bottom-10
    bg-red-200
    rounded-[50%]
    overflow-hidden
    mb-[-20px]
`;

export const Spacer = tw.div`
    flex-1
`;

export const CardHeading = tw.div`
    font-normal
    text-xl
    
`;

export const CardSubHeading = tw.div`
    font-light
    text-sm
    mb-6
`;

export const CardBtn = tw.div`
    w-full
    px-6
    py-2
    bg-red-600
    text-center
    text-sm
    font-bold
    rounded-md
    flex
    items-center
    cursor-pointer
`;

export const ListView = tw.div`
    self-stretch
    flex    
    flex-col
    items-stretch
`;

export const ListTile = tw.div`
    mt-6
    flex
    items-center
    cursor-pointer
    stroke-[#dedede]
    hover:text-[color:var(--color-secondary)]
    hover:stroke-[color:var(--color-secondary)]
`;

export const ListTileImg = tw.div`
    w-6
    h-6
    object-contain
    flex
    items-center
    justify-center
`;

export const ListTileContent = tw.div`
    font-bold
    ml-4
`;
