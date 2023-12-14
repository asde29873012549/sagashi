import { useRef, useCallback } from "react";

function useInterSectionObserver({ isFetchingNextPage, hasNextPage, fetchNextPage }) {
	const observer = useRef();

	const lastElement = useCallback(
		(node) => {
			if (isFetchingNextPage) return;
			if (observer.current) {
				observer.current.disconnect();
			}
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasNextPage) {
					fetchNextPage();
				}
			});

			if (node) observer.current.observe(node);
		},
		[isFetchingNextPage, hasNextPage],
	);

	return lastElement;
}

export default useInterSectionObserver;
