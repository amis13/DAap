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
        fancyUndeads.methods.tokenURI(dna).call(),
        fancyUndeads.methods.tokenDNA(dna).call(),
        fancyUndeads.methods.ownerOf(dna).call(),
        fancyUndeads.methods.getAccessoriesType(dna).call(),
        fancyUndeads.methods.getAccessoriesType(dna).call(),
        fancyUndeads.methods.getClotheColor(dna).call(),
        fancyUndeads.methods.getClotheType(dna).call(),
        fancyUndeads.methods.getEyeType(dna).call(),
        fancyUndeads.methods.getEyeBrowType(dna).call(),
        fancyUndeads.methods.getFacialHairColor(dna).call(),
        fancyUndeads.methods.getFacialHairType(dna).call(),
        fancyUndeads.methods.getHairColor(dna).call(),
        fancyUndeads.methods.getHatColor(dna).call(),
        fancyUndeads.methods.getGraphicType(dna).call(),
        fancyUndeads.methods.getMouthType(dna).call(),
        fancyUndeads.methods.getSkinColor(dna).call(),
        fancyUndeads.methods.getTopType(dna).call(),
        ]);

    const responseMetadata = await fetch(tokenURI);
    const metadata = await responseMetadata.json();

    return {
        tokenId,
        attributes:{
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
            topType
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
            tokenIds = new Array(Number(totalSupply)).fill().map((_, index) => index);

            const undeadsPromise = tokenIds.map((tokenId) =>
            getUndeadData({ tokenId, fancyUndeads})
            );

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
