"use client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getSingleEpisode } from "@/services/episode.service";
import { getAllCharacter } from "@/services/character.service";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

const RightSideLayout = ({
  clickedEpisodeId,
  episodeName,
}: {
  clickedEpisodeId: number | null;
  episodeName: string;
}) => {
  const [activePage, setActivePage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(20);
  const {
    data: allCharachterData,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["allCharacter", clickedEpisodeId, activePage],
    queryFn: () =>
      clickedEpisodeId
        ? getSingleEpisode(clickedEpisodeId)
        : getAllCharacter(activePage),
  });
  console.log(clickedEpisodeId, "clickedEpisodeId");
  console.log(allCharachterData, "allCharachterData");

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="p-6 border flex flex-col justify-center items-center w-[80vw]">
      <p className="text-3xl">{!isFetching && episodeName}</p>
      <div className="grid gap-4 grid-cols-4 grid-rows-4 items-center justify-items-center">
        {isFetching
          ? Array.from({ length: 20 }, (v, i) => (
              <Skeleton className="h-[125px] w-[250px] rounded-xl" key={i} />
            ))
          : clickedEpisodeId
          ? allCharachterData?.map((character: any) => {
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
            })
          : allCharachterData?.results?.map((character: any) => {
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

      {!isFetching && !clickedEpisodeId && (
        <Pagination className="mt-5">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setActivePage(activePage - 1)}
                className="cursor-pointer"
                aria-disabled={activePage === 1}
              />
            </PaginationItem>
            <PaginationItem>
              {Array.from(
                { length: allCharachterData?.info?.pages },
                (page, index) => {
                  return (
                    <PaginationLink
                      key={index}
                      className="cursor-pointer"
                      onClick={() => setActivePage(index + 1)}
                      isActive={activePage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  );
                }
              )}
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => setActivePage(activePage + 1)}
                className="cursor-pointer"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default RightSideLayout;
