"use client";
import AppSidebar from "@/components/app-sidebar";
import { getAllCharacter } from "@/services/character.service";
import { getSingleEpisode } from "@/services/episode.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import RightSideLayout from "@/components/rightside-layout";

export default function Home() {
  const [clickedEpisodeId, setClickedEpisodeId] = useState<number | null>(null);
  const [episodeName, setEpisodeName] = useState<string>("All Character");

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
      {/* Lest Side Navbar  */}

      <AppSidebar getActiveEpisode={getActiveEpisode} />

      {/* Right Side Layout  */}
      <RightSideLayout
        isFetching={isFetching}
        episodeName={episodeName}
        allCharachterData={allCharachterData}
      />
    </div>
  );
}
