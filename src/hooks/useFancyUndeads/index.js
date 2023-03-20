import { useMemo } from "react";
import { useWeb3React} from "@web3-react/core";
import FancyUndeadsArtifact from "../../config/web3/artifacts/FancyUndeads";

const { address, abi } = FancyUndeadsArtifact;
const useFancyUndeads = () => {
    const { active, library, chainId } = useWeb3React();

    const fancyUndeads = useMemo(
        () => {
            if(active) return new library.eth.Contract(abi, address[chainId])
        },
        [active, chainId, library?.eth?.Contract]);
    return fancyUndeads;
};

export default useFancyUndeads;