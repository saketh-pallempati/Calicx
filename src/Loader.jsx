import { FlatTree } from "framer-motion";
import ReactLoading from "https://cdn.skypack.dev/react-loading@2.0.3";

export default function Loader() {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: '100%', height: "100%" }}>
            <ReactLoading
                type={"bars"}
                color={"#5465ff"}
                height={"15%"}
                width={"15%"}
            />
        </div>
    );
}