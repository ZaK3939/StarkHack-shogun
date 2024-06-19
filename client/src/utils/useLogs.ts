import { BattleLogDetailEvent } from "./events";

export enum EventType {
    BattleLogDetail = "BattleLogDetail",
}

export type LogType = {
    key: string;
    timestamp: number;
    type: EventType;
    log: BattleLogDetailEvent;
};

