import React from "react";
import { Link } from "react-router-dom";
import { SimpleGrid } from "@chakra-ui/core";
import Card, { CardOwner } from "./../../components/card";

const CreationList = ({ creations, owner }) => {
  return (
    <SimpleGrid
      columns={[1, null, null, 2, 3]}
      spacing={[8, null, null, "40px"]}
      mb="4"
    >
      {creations &&
        creations.map((heliblock, key) => {
          if (owner) {
            return (
              <CardOwner
                id={heliblock.id}
                title={heliblock.title}
                lastUpdate={heliblock.lastUpdate}
                screenshot={heliblock.screenshot}
              />
            );
          } else {
            return (
              <Link
                to={"/heliblock/" + heliblock.id}
                className="card z-depth-0 heliblock-summary"
                key={key}
              >
                <div className="card-content grey-text text-darken-3">
                  <span className="card-title ">{heliblock.title}</span>
                  <p className="grey-text">{heliblock.lastUpdate}</p>
                </div>
              </Link>
            );
          }
        })}
    </SimpleGrid>
  );
};
export default CreationList;
