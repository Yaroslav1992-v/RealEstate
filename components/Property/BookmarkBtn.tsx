"use client";
import React, { useEffect, useState } from "react";
import ActionButton from "../ActionButton";
import { FaBookmark } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import bookmarkService from "@/services/bookmarkService";
import { useParams } from "next/navigation";

const BookmarkBtn = () => {
  const { data: session } = useSession();
  const { id } = useParams();
  const userId = session as any["user"]["id"];
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!userId) {
        setLoading(false)
      return;
    }
    const checkBookMarkStatus = async () => {
      try {
        const res = await bookmarkService.ifBookmarked(
          typeof id === "string" ? id : id[0]
        );
        if (res) {
          setIsBookmarked(res.isBookmarked);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    checkBookMarkStatus();
  }, [id, userId]);
  const handleClick = async () => {
    if (!userId && !id) {
      toast.error("You need to sign in to bookmark a property");
      return;
    }
    setLoading(true);
    try {
      const res = await bookmarkService.handleBookMark(
        typeof id === "string" ? id : id[0]
      );
      if (res) {
        toast.success(res.message);
        setIsBookmarked(res.isBookmarked);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ActionButton
      text={isBookmarked ? "Remove Bookmark" : "Bookmark Property"}
      className={
        isBookmarked
          ? "bg-red-500 hover:bg-red-600  "
          : "bg-blue-500 hover:bg-blue-600  "
      }
      Icon={FaBookmark}
      action={handleClick}
      loading={loading}
    />
  );
};

export default BookmarkBtn;
