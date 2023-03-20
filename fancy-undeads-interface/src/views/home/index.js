import { useCallback, useEffect, useState } from "react";
import useFancyUndeads from "../../hooks/useTruncatedAddress/useFancyUndeads";
import { useWeb3React } from "@web3-react/core";

const Home = () => { 
  const {active} = useWeb3React();
  const [maxSupply, setMaxSupply] = useState();
  const fancyUndeads = useFancyUndeads();

  const getMaxSupply = useCallback( async () => {
    if(fancyUndeads){
      const result = await fancyUndeads.methods.maxSupply().call();
      setMaxSupply(result);
    }

  }, [fancyUndeads])

  useEffect(() => {
    getMaxSupply();
  }, [getMaxSupply])

  if(!active) return "Conecta tu wallet"
    return (
        <>
        <p>max supply: {maxSupply}</p>
      </>
    );
};
 export default Home;
