import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ poiId, refType, isCurrentlyFavorited, poiData }) => {
      const endpoint = "/api/favorites";

      const response = await fetch(endpoint, {
        method: isCurrentlyFavorited ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(
          isCurrentlyFavorited
            ? { poiId, refType }
            : { poiId, refType, poiData }
        ),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "收藏操作失败");
      }

      return response.json();
    },

    // 乐观更新
    onMutate: async ({ poiId, refType, isCurrentlyFavorited, poiData }) => {
      try {
        await queryClient.cancelQueries(["currentUser", "favorites"]);

        const prevFavorites = queryClient.getQueryData([
          "currentUser",
          "favorites",
        ]);

        queryClient.setQueryData(["currentUser", "favorites"], oldRaw => {
          const old = Array.isArray(oldRaw) ? oldRaw : [];

          if (isCurrentlyFavorited) {
            return old.filter(
              item => !(item.poiId === poiId && item.refType === refType)
            );
          } else {
            return [
              ...old,
              {
                _id: "optimistic-" + poiId,
                refType,
                poiId,
                addedAt: new Date().toISOString(),
                ...(refType === "ExternalPOI" && poiData ? poiData : {}),
              },
            ];
          }
        });

        return { prevFavorites };
      } catch (e) {
        console.error("[onMutate error]", e);
        return {}; // 一定要 return，防止 mutation 中断
      }
    },

    //   return { prevFavorites };
    // },

    onError: (err, variables, context) => {
      if (context?.prevFavorites) {
        queryClient.setQueryData(
          ["currentUser", "favorites"],
          context.prevFavorites
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries(["currentUser", "favorites"]);
    },

    onSuccess: () => {},
  });
}
