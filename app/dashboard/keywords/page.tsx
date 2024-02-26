import React from "react";
import styles from "@/app/ui/dashboard/keywords/keywords.module.css";
import Search from "@/app/ui/dashboard/search/search";
import { fetchAllKeywords, fetchKeywordsForSearch } from "@/app/lib/data";
import { KeywordsSearchResult } from "@/app/ui/dashboard/keywords/keywordsSearchResult";
import { AddKeyword } from "@/app/ui/dashboard/keywords/addKeyword";

const KeywordsPage = async ({ searchParams }: { searchParams: any }) => {
  const keywordsData = await fetchAllKeywords();

  const q = searchParams?.q || "";

  const {
    success,
    message: searchMessage,
    plainKeywords,
  } = await fetchKeywordsForSearch(q);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <AddKeyword />
      </div>
      <div className={styles.container}>
        <Search
          placeholder="Search for a keywords..."
          searchParams={searchParams}
        />
        <KeywordsSearchResult
          plainKeywords={plainKeywords}
          keywordsData={keywordsData}
          success={success}
          searchMessage={searchMessage}
        />
      </div>
    </div>
  );
};

export default KeywordsPage;
