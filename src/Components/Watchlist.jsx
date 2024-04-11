import { useState, useEffect } from "react";
import { useFirestore } from "../services/firestore";
import { useAuth } from "../context/useAuth";
import { WatchlistCard } from "./WatchlistCard";
import Loading from "./Loading.jsx";

const Watchlist = () => {
  const { getWatchlist } = useFirestore();
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user.uid) {
      getWatchlist(user.uid)
        .then((data) => {
          setWatchlist(data);
          // console.log(data);
        })
        .catch((err) => {
          console.log(err, "error");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [user.uid, getWatchlist]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100% ",
        padding: "20px 0",
      }}
    >
      <h2 style={{ margin: "15px 0" }}>Watchlist</h2>
      {isLoading && <Loading />}
      {!isLoading && watchlist.length === 0 && (
        <div>
          <h3>Watchlist is empty</h3>
        </div>
      )}
      {!isLoading && watchlist.length > 0 && (
        <>
          {watchlist.map((item) => (
            <WatchlistCard
              key={item.id}
              item={item}
              setWatchlist={setWatchlist}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Watchlist;
