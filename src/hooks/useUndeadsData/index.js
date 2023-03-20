import { useCallback, useEffect, useState } from "react";
import useFancyUndeads from "../useFancyUndeads";

const getUndeadData = async ({ fancyUndeads, tokenId }) => {
    const [
        tokenURI,
        dna,
        owner,
        accesoriesType,
        clotheColor,
        clotheType,
        eyeType,
        eyeBrowType,
        facialHairColor,
        facialHairType,
        hairColor,
        hatColor,
        graphicType,
        mouthType,
        skinColor,
        topType,
        ] = await Promise.all([
        fancyUndeads.methods.tokenURI(tokenId).call(),
        fancyUndeads.methods.tokenDNA(tokenId).call(),
        fancyUndeads.methods.ownerOf(tokenId).call(),
        fancyUndeads.methods.getAccessoriesType(tokenId).call(),
        fancyUndeads.methods.getAccessoriesType(tokenId).call(),
        fancyUndeads.methods.getClotheColor(tokenId).call(),
        fancyUndeads.methods.getClotheType(tokenId).call(),
        fancyUndeads.methods.getEyeType(tokenId).call(),
        fancyUndeads.methods.getEyeBrowType(tokenId).call(),
        fancyUndeads.methods.getFacialHairColor(tokenId).call(),
        fancyUndeads.methods.getFacialHairType(tokenId).call(),
        fancyUndeads.methods.getHairColor(tokenId).call(),
        fancyUndeads.methods.getHatColor(tokenId).call(),
        fancyUndeads.methods.getGraphicType(tokenId).call(),
        fancyUndeads.methods.getMouthType(tokenId).call(),
        fancyUndeads.methods.getSkinColor(tokenId).call(),
        fancyUndeads.methods.getTopType(tokenId).call(),
        ]);

    const responseMetadata = await fetch(tokenURI);
    const metadata = await responseMetadata.json();

    return {
        tokenId,
        attributes:{
            accesoriesType , clotheColor, clotheType , 
            eyeType, eyeBrowType, facialHairColor, 
            facialHairType, hairColor, hatColor, 
            graphicType, mouthType, skinColor, topType,
        },
        tokenURI,
        dna,
        owner,
        ...metadata,
    };

};


const useUndeadsData = () => {
    const [undeads, setUndeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const fancyUndeads = useFancyUndeads();

    const update = useCallback(async () => {
        if(fancyUndeads){
            setLoading(true);

            let tokenIds;

            const totalSupply = await fancyUndeads.methods.totalSupply.call();
            tokenIds = new Array(Number(totalSupply).fill().map((_, index) => index));

            const undeadsPromise = tokenIds.map((tokenId) =>
            getUndeadData({ tokenId, fancyUndeads}));

            const undeads = await Promise.all(undeadsPromise);

            setUndeads(undeads);

            setLoading(false);
        }

    }, [fancyUndeads]);

    useEffect(() => {
        update();
    }, [update]);

    return {
        loading,
        undeads,
        update,
    };

};

export { useUndeadsData };
