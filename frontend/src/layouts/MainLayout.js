import LeftMenu from "../components/menus/LeftMenu/LeftMenu";
import TopMenu from "../components/menus/TopMenu/TopMenu";

export default function MainLayout(props) {
    const { identifier } = props.match ? props.match.params : "";
    return (
        <div>
            <TopMenu projectId={identifier}/>
            <LeftMenu items={props.menuContent} projectId={identifier}/>
            <div className="content-wrapper">
                {props.children}
            </div>
        </div>
    )
}
