"use client";

import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../store";
import {
  hydrateCart,
  loadCartFromLocalStorage,
} from "../store/features/cartSlice";

/**
 * Adopts the quote saved in this browser, once, after mount.
 *
 * The cart slice used to read localStorage in its initial state, which the
 * server cannot do — so the server HTML carried an empty quote and the first
 * client render carried the real one, and React discarded the tree with a
 * hydration error (#418) on every page with a quote count in the navbar.
 */
function CartHydrator() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hydrateCart(loadCartFromLocalStorage()));
  }, [dispatch]);

  return null;
}

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <CartHydrator />
      {children}
    </Provider>
  );
}
