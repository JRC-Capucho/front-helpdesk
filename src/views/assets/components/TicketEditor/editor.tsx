import moment from 'moment';
import React, { Component } from 'react';

interface IPorfile {
    _id: String,
    name: String
}

interface ISector {
    _id: String,
    name: String
}

interface IDiscourse {
    name: String,
    content: String,
    date: Date
}

interface ComponentProps {
    _id: string | null,
    content: ComponentState | {},

};

interface ComponentState {
    title: String,
    creater: IPorfile,
    creationDate: moment.Moment | null,
    closingDate: Date | null,
    priority: Number | null,
    status: Number,
    relatedUsers: IPorfile[],
    sectors: ISector | null,
    discourse: IDiscourse[],
};

class TicketEditor extends Component<ComponentProps, ComponentState> {
    state: ComponentState = {
        title: "",
        creater: {
            _id: "",
            name: ""
        },
        creationDate: moment(),
        closingDate: null,
        priority: null,
        status: 0,
        relatedUsers: [],
        sectors: null,
        discourse: [],
    };

    constructor(props: ComponentProps) {
        super(props)
        this.setState(props.content)
    }

    render(): React.ReactNode {
        return (
            <>
                <input type="text" name="title" />
                <select name="sector" />
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <input type="text" />

            </>
        )
    }

}

export default TicketEditor;
