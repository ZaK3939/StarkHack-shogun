export type Event = {
    id: string;
    keys: string[];
    data: string[];
    createdAt: string;
    transactionHash: string;
};

//---------------------------------------------------------------------
// Battle event
export interface BattleLogDetailEvent {
    // timestamp: string;
    player: string;
    battleLogId: number;
    id: number;
    whoTriggered: string;
    whichItem: number;
    damageCaused: number;
    isDodged: boolean;
    buffType: string;
    regenHP: number;
    player_armor_stacks: number;
    player_regen_stacks: number;
    player_reflect_stacks: number;
    player_spike_stacks: number;
    dummy_armor_stacks: number;
    dummy_regen_stacks: number;
    dummy_reflect_stacks: number;
    dummy_spike_stacks: number;
}

export const parseBattleLogDetailEvent = (
    event: Event
): BattleLogDetailEvent => {
    console.log(event);
    const player = event.keys[0];
    const battleLogId = parseInt(event.keys[1]);
    const id = parseInt(event.keys[2]);
    const whoTriggered = event.data[0];
    const whichItem = parseInt(event.data[1]);
    const damageCaused = parseInt(event.data[2]);
    const isDodged = event.data[3] === "true";
    const buffType = event.data[4];
    const regenHP = parseInt(event.data[5]);
    const player_armor_stacks = parseInt(event.data[6]);
    const player_regen_stacks = parseInt(event.data[7]);
    const player_reflect_stacks = parseInt(event.data[8]);
    const player_spike_stacks = parseInt(event.data[9]);
    const dummy_armor_stacks = parseInt(event.data[10]);
    const dummy_regen_stacks = parseInt(event.data[11]);
    const dummy_reflect_stacks = parseInt(event.data[12]);
    const dummy_spike_stacks = parseInt(event.data[13]);

    return {
        player,
        battleLogId,
        id,
        whoTriggered,
        whichItem,
        damageCaused,
        isDodged,
        buffType,
        regenHP,
        player_armor_stacks,
        player_regen_stacks,
        player_reflect_stacks,
        player_spike_stacks,
        dummy_armor_stacks,
        dummy_regen_stacks,
        dummy_reflect_stacks,
        dummy_spike_stacks,
    };
};

