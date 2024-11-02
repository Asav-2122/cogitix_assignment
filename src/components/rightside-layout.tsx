"use client";
import React from "react";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";

const RightSideLayout = ({
  isFetching,
  episodeName,
  allCharachterData,
}: {
  isFetching: boolean;
  episodeName: string;
  allCharachterData: any;
}) => {
  return (
    <div className="p-6 border flex flex-col justify-center items-center w-[80vw]">
      <p className="text-3xl">{!isFetching && episodeName}</p>
      <div className="grid gap-4 grid-cols-4 grid-rows-4 items-center justify-items-center">
        {isFetching
          ? Array.from({ length: 20 }, (v, i) => (
              <Skeleton className="h-[125px] w-[250px] rounded-xl" key={i} />
            ))
          : allCharachterData?.map((character: any) => {
              return (
                <Card key={character?.id} className="cursor-pointer max-w-40">
                  <CardHeader>
                    <CardTitle>{character?.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={character?.image}
                      width={100}
                      height={100}
                      alt="image"
                    />
                  </CardContent>
                </Card>
              );
            })}
      </div>
    </div>
  );
};

export default RightSideLayout;
