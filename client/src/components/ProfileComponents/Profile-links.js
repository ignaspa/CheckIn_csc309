import React, { Component } from "react";
import { Link } from "react-router-dom"

export default class ProfileLinks extends Component {
    render() {
        return (
            <div className="text-center mt-3">
                <div>
                    Marco viewing his own profile:
                    <Link
                        to={{
                            pathname: '/profile',
                            state: {
                                user_id: 1,
                                profile_id: 1,
                            }

                        }}>
                        Link
                    </Link>
                </div>
                <div>
                    Marco viewing his Abdullah's profile:
                    <Link
                        to={{
                            pathname: '/profile',
                            state: {
                                user_id: 1,
                                profile_id: 2,
                            }

                        }}>
                        Link
                    </Link>
                </div>
            </div>
        );
    }
}