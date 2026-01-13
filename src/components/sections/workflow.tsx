import { WorkflowClient } from "@/components/sections/workflow-client";

const workflows = [
  {
    id: "flow",
    label: "Flow",
    code: `# workflow.yaml - Osmedeus Workflow Example
kind: flow
name: demo-flow
description: Demo flow orchestrating modules with decision routing
params:
  - name: threads
    default: "5"
  - name: mode
    default: "full"
modules:
  - name: bash-module
    path: sub-module/demo-bash.yaml
    params:
      threads: "{{threads}}"

  - name: docker-module
    path: sub-module/demo-docker.yaml
    depends_on: [bash-module]
    condition: "{{mode}} == 'full'"
    on_success:
      - action: export
        name: scan_status
        value: "complete"
    decision:
      switch: "{{scan_status}}"
      cases:
        "complete": { goto: ssh-module }
      default: { goto: _end }

  - name: ssh-module
    path: sub-module/demo-ssh.yaml
    depends_on: [docker-module]`,
  },
  {
    id: "bash",
    label: "Bash",
    code: `# workflow.yaml - Osmedeus Workflow Example
kind: module
name: demo-bash
description: Demo bash steps with functions and exports
params:
  - name: target
    required: true
  - name: threads
    default: "5"
steps:
  - name: setup
    type: bash
    command: mkdir -p {{Output}}/demo && echo "{{Target}}" > {{Output}}/demo/target.txt
    exports:
      target_file: "{{Output}}/demo/target.txt"
  - name: run-parallel
    type: bash
    parallel_commands:
      - 'echo "Thread 1: {{Target}}" >> {{Output}}/demo/results.txt'
      - 'echo "Thread 2: {{Target}}" >> {{Output}}/demo/results.txt'
  - name: check-result
    type: function
    function: 'fileLength("{{Output}}/demo/results.txt")'
    exports:
      line_count: "output"
  - name: summary
    type: bash
    command: 'echo "Processed {{Target}} with {{line_count}} lines"'`,
  },
  {
    id: "docker",
    label: "Docker",
    code: `# workflow.yaml - Osmedeus Workflow Example
kind: module
name: demo-docker
description: Demo Docker runner with remote-bash
params:
  - name: target
    required: true
steps:
  - name: docker-single
    type: remote-bash
    log: "Running in Alpine container"
    step_runner: docker
    step_runner_config:
      image: alpine:latest
      volumes:
        - "{{Output}}:/output"
    command: 'echo "Target: {{Target}}" > /output/docker-out.txt'
  - name: docker-parallel
    type: remote-bash
    step_runner: docker
    step_runner_config:
      image: alpine:latest
    parallel_commands:
      - 'echo "Scan A: {{Target}}"'
      - 'echo "Scan B: {{Target}}"'
    exports:
      docker_done: "true"`,
  },
  {
    id: "ssh",
    label: "SSH",
    code: `# workflow.yaml - Osmedeus Workflow Example
kind: module
name: demo-ssh
description: Demo SSH runner with remote-bash
params:
  - name: target
    required: true
  - name: ssh_host
    default: "localhost"
  - name: ssh_user
    default: "testuser"
  - name: ssh_password
    default: "testpass"

steps:
  - name: ssh-connect
    type: remote-bash
    log: "Executing via SSH"
    step_runner: ssh
    step_runner_config:
      host: "{{ssh_host}}"
      port: 2222
      user: "{{ssh_user}}"
      password: "{{ssh_password}}"
    commands:
      - 'echo "Target: {{Target}}"'
      - 'hostname && whoami'
    exports:
      ssh_done: "true"`,
  },
] as const;

export function Workflow() {
  return <WorkflowClient tabs={[...workflows]} />;
}

