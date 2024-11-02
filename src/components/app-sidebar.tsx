"use client";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { getAllEpisodes } from "@/services/episode.service";
import { useState } from "react";

export default function AppSidebar({ getActiveEpisode }: any) {
  const [isActiveEpisodeId, setIsActiveEpisodeId] = useState(null);

  const { data: allEpisodes } = useQuery({
    queryKey: ["allEpisodes"],
    queryFn: () => getAllEpisodes(),
  });

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Episodes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {allEpisodes?.results?.map((item: any) => (
                <SidebarMenuItem
                  key={item?.id}
                  onClick={() => {
                    getActiveEpisode(item?.id,item?.name), setIsActiveEpisodeId(item?.id);
                  }}
                  className="cursor-pointer py-2"
                >
                  <SidebarMenuButton
                    asChild
                    isActive={item?.id === isActiveEpisodeId ? true : false}
                  >
                    <span>{item?.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>


    
  );
}
