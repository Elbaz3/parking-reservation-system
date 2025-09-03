import type { RootState } from "../store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  addRushHour,
  addVacation,
  getAllSubscriptions,
  getParkingState,
  toggleZoneOpen,
  updateCategoryRates,
} from "../services/api";
import type Zone from "../types/TZone";
import type { TSubscriber } from "../types/TSubscriber";

const useAdmin = () => {
  const token = useSelector((state: RootState) => state.auth.user?.token);
  const role = useSelector((state: RootState) => state.auth.user?.user.role);
  const [zones, setZones] = useState<Zone[]>([]);
  const [subs, setSubs] = useState<TSubscriber[]>([]);
  const [zLoading, setZLoading] = useState(false);
  const [subLoading, setSubLoading] = useState(false);
  const [toglleLoading, setToglleLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      return;
    }
    setZLoading(true);
    const zones = getParkingState()
      .then((data) => {
        setZones(data);
      })
      .finally(() => {
        setZLoading(false);
      });
    setSubLoading(true);
    const subscriptions = getAllSubscriptions(token)
      .then((data) => {
        setSubs(data);
      })
      .finally(() => {
        setSubLoading(false);
      });
  }, [token]);

  const handleToggleZone = async (zoneId: string, open: boolean) => {
    if (!token) return;
    setToglleLoading(true);
    try {
      const res = await toggleZoneOpen(zoneId, !open, token);
      const zonesRes = await getParkingState();

      setZones(zonesRes);
      setToglleLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [categoryId, setCategoryId] = useState("cat_premium");

  //  Update category rates
  const handleUpdateRates = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) return;

    const form = e.currentTarget;
    const rateNormal = Number(
      (form.elements.namedItem("rateNormal") as HTMLInputElement).value
    );
    const rateSpecial = Number(
      (form.elements.namedItem("rateSpecial") as HTMLInputElement).value
    );
    if (!rateNormal || !rateSpecial) {
      alert("fill the value(s) please");
      return;
    }
    await updateCategoryRates(categoryId, { rateNormal, rateSpecial }, token);
    alert("Category rates updated!");
  };

  //  Add rush hour
  const handleAddRushHour = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;

    const form = e.currentTarget;
    const start = (form.elements.namedItem("start") as HTMLInputElement).value;
    const end = (form.elements.namedItem("end") as HTMLInputElement).value;

    if (!start || !end) {
      alert("fill the time");
      return;
    }
    await addRushHour({ start, end }, token);
    alert("Rush hour added!");
  };

  //  Add vacation
  const handleAddVacation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) return;

    const form = e.currentTarget;
    const start = (form.elements.namedItem("start") as HTMLInputElement).value;
    const end = (form.elements.namedItem("end") as HTMLInputElement).value;

    if (!start || !end) {
      alert("fill the time");
      return;
    }

    await addVacation({ start, end }, token);
    alert("Vacation added!");
  };

  return {
    token,
    zones,
    subs,
    categoryId,
    handleAddRushHour,
    handleAddVacation,
    handleToggleZone,
    handleUpdateRates,
    setCategoryId,
    zLoading,
    subLoading,
    toglleLoading,
    role,
  };
};

export default useAdmin;
