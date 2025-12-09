import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";

interface ChallengeStats {
  views: number;
  participants: number;
}

export const useChallengeSocket = (
  challengeId: string,
  initialViews: number,
  initialParticipants: number
) => {
  const { socket, isConnected } = useSocket();
  const [stats, setStats] = useState<ChallengeStats>({
    views: initialViews,
    participants: initialParticipants,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/challenges/${challengeId}/stats`
        );
        if (response.ok) {
          const data = await response.json();
          setStats({
            views: data.totalViews,
            participants: data.totalParticipants,
          });
        }
      } catch (error) {
        console.error("Error fetching challenge stats:", error);
      }
    };

    if (isConnected) {
      fetchStats();
    }
  }, [challengeId, isConnected]);

  useEffect(() => {
    if (!socket) return;

    socket.emit("join_challenge", challengeId);

    const handleUpdate = (data: {
      type: string;
      challengeId: string;
      count: number;
    }) => {
      if (data.challengeId !== challengeId) return;

      setStats((prev) => {
        if (data.type === "views_update") {
          return { ...prev, views: data.count };
        } else if (data.type === "participants_update") {
          return { ...prev, participants: data.count };
        }
        return prev;
      });
    };

    socket.on("challenge_updated", handleUpdate);

    return () => {
      socket.emit("leave_challenge", challengeId);
      socket.off("challenge_updated", handleUpdate);
    };
  }, [socket, challengeId]);

  return stats;
};
