import React, { useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';
import { CardOwner, Card, SkeletonCard } from "components/card";
import { sortByLastUpdate, fillHeliblocks, splitArrayByAttribute } from "./utilsProfile";

const HeliblocksProfile = ({ ids, isOwner } ) => {
    const [ loading, setLoading ] = useState(true);
    const [ hasError, setHasError ] = useState(false)
    const [ heliblocks, setHeliblocks ] = useState([]);

    const arangeHeliblocks = useCallback((rawHeliblocks) => {
        const heliblocksWithId = rawHeliblocks.map( (heliblock, index) => ({
            ...heliblock,
            id: ids[index]
        }));
        const [drafts, published ] = splitArrayByAttribute(heliblocksWithId, "draft");
        if(isOwner) {
            setHeliblocks([...sortByLastUpdate(drafts), ...sortByLastUpdate(published)])
        } else {
            setHeliblocks(sortByLastUpdate(published));
        }
        setLoading(false)
    }, [isOwner, ids])

    useEffect(() => {
        fillHeliblocks(ids)
            .then(arangeHeliblocks)
            .catch(() => setHasError(true));
    }, [ids, arangeHeliblocks]);

    if(hasError) {
        return null;
    }
    if(loading) {
        return ids.map( id => <SkeletonCard key={id} />)
    }
    if(isOwner) {
        return heliblocks.map( heliblock => <CardOwner {...heliblock} key={heliblock.id} />)
    } else {
        return heliblocks.map( heliblock => <Card {...heliblock} key={heliblock.id} />)
    }
}

export default HeliblocksProfile;

HeliblocksProfile.propTypes = {
    ids: PropTypes.array,
    isOwner: PropTypes.bool
}

HeliblocksProfile.defaultProps = {
    ids: [],
    isOwner: false
}