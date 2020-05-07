/**
 * @copyright 2009-2019 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

import React from "react";
import { eventsClasses } from "@library/events/eventStyles";
import { IUserFragment } from "@library/@types/api/users";
import { UserPhoto } from "@library/headers/mebox/pieces/UserPhoto";
import Heading from "@library/layout/Heading";
import NumberFormatted from "@library/content/NumberFormatted";
import { renderToString } from "react-dom/server";
import Paragraph from "@library/layout/Paragraph";
import { dummyEventDetailsData } from "@library/dataLists/dummyEventData";

export interface IEventAttendees {
    data: IUserFragment[];
    title: string;
    extra?: number;
    separator?: boolean;
    depth?: 2 | 3;
    maxCount?: number;
    emptyMessage?: string;
}

/**
 * Component for displaying an event details
 */
export function EventAttendees(props: IEventAttendees) {
    const { data, maxCount = 10, extra, separator = false, depth = 2, title, emptyMessage } = props;
    const empty = data.length === 0;

    const classes = eventsClasses();

    return (
        <section className={classes.details}>
            {separator && <hr className={classes.separator} />}
            <Heading depth={depth}>{title}</Heading>
            {empty && <Paragraph className={classes.noAttendees}>{emptyMessage}</Paragraph>}
            {!empty && (
                <ul className={classes.attendeeList}>
                    {data.map((user, i) => {
                        return (
                            <li className={classes.attendee} key={i}>
                                <UserPhoto className={classes.attendeePhoto} userInfo={user} />
                            </li>
                        );
                    })}
                    {extra && (
                        <li
                            className={classes.attendeePlus}
                            key={data.length + 1}
                            dangerouslySetInnerHTML={{
                                __html: `+${renderToString(<NumberFormatted value={extra} />)}`,
                            }}
                        />
                    )}
                </ul>
            )}
        </section>
    );
}
