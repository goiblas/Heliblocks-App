import React, { useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';
import { CardOwner, SkeletonCard } from "components/card";
import { sortByLastUpdate, fillHeliblocks, splitArrayByAttribute } from "./utilsProfile";

const OwnHeliblocks = ({ ids } ) => {
    const [ loading, setLoading ] = useState(true);
    const [ hasError, setHasError ] = useState(false)
    const [ heliblocks, setHeliblocks ] = useState([]);

    const arangeHeliblocks = useCallback((rawHeliblocks) => {
        const heliblocksWithId = rawHeliblocks.map( (heliblock, index) => ({
            ...heliblock,
            id: ids[index]
        }));
        const [drafts, published ] = splitArrayByAttribute(heliblocksWithId, "draft");
        setHeliblocks([...sortByLastUpdate(drafts), ...sortByLastUpdate(published)])
    }, [ids])

    useEffect(() => {
        fillHeliblocks(ids)
            .then(arangeHeliblocks)
            .catch(() => setHasError(true))
            .finally(() => setLoading(false));
    }, [ids, arangeHeliblocks]);

    if(hasError) {
        return null;
    }
    if(loading) {
        return ids.map( id => <SkeletonCard key={id} />)
    }
    return heliblocks.map( heliblock => <CardOwner {...heliblock} key={heliblock.id} />)
}

export default OwnHeliblocks;

OwnHeliblocks.propTypes = {
    ids: PropTypes.array
}
OwnHeliblocks.defaultProps = {
    ids: []
}