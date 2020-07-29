import React from "react";
import PropTypes from 'prop-types';
import { Card, SkeletonCard, withHeliblock } from "components/card";

const CardWithHeliblock = withHeliblock(Card);

const PublicHeliblocks = ({ ids }) => {
    return ids.map( id => <CardWithHeliblock key={id} id={id} fallback={<SkeletonCard />} />)
}

export default PublicHeliblocks;

PublicHeliblocks.propTypes = {
    ids: PropTypes.array
}
PublicHeliblocks.defaultProps = {
    ids: []
}