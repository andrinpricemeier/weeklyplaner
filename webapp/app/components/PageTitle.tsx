interface IPageTitleProps {
    title: string;
}

const PageTitle = (props: IPageTitleProps) => {
    return <h1 className={"text-4xl"}>{props.title}</h1>;
}

export default PageTitle;