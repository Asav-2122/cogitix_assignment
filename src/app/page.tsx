"use client";
import AppSidebar from "@/components/app-sidebar";
import {
  getAllCharacter,
  getCharactersByEpisode,
} from "@/services/character.service";
import { getAllEpisodes, getSingleEpisode } from "@/services/episode.service";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [clickedEpisodeId, setClickedEpisodeId] = useState<any>(null);
  const [episodeName, setEpisodeName] = useState<string>("All Character");
  const [characterData, setCharacterData] = useState<any>([]);
  //  console.log(clickedEpisodeId,"clickedEpisodeId")

  const {
    data: allCharachterData,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["allCharacter", clickedEpisodeId],
    queryFn: () =>
      clickedEpisodeId ? getSingleEpisode(clickedEpisodeId) : getAllCharacter(),
  });

  const getActiveEpisode = (episodeId: number, episodeName: string) => {
    setClickedEpisodeId(episodeId);
    setEpisodeName(episodeName);
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="flex flex-row justify-evenly">
      <AppSidebar getActiveEpisode={getActiveEpisode} />

      <div className=" p-6 border flex flex-col justify-center items-center w-[80vw]">
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
                      {/* <CardDescription>Card Description</CardDescription> */}
                    </CardHeader>
                    <CardContent>
                      <Image
                        src={character?.image}
                        width={100}
                        height={100}
                        alt="image"
                        // className="w-full"
                      />
                    </CardContent>
                  </Card>
                );
              })}
        </div>
      </div>
    </div>
  );
}
