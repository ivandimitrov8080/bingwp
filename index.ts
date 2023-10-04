#!/usr/bin/env -S bun run

import { bing, dl } from "./lib";


dl(await bing())
