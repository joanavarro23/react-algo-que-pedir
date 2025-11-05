import { For, SimpleGrid, Tabs } from "@chakra-ui/react"
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu"


export const DetallePedido = () => {
  return (
      <For each={["line"]}>
        {(variant) => (
          <Tabs.Root key={variant} defaultValue="completados" variant={variant}>
            <Tabs.List>
              <Tabs.Trigger value="pendientes">
                <LuUser />
                Pendientes
              </Tabs.Trigger>
              <Tabs.Trigger value="completados">
                <LuFolder />
                Completados
              </Tabs.Trigger>
              <Tabs.Trigger value="cancelados">
                <LuSquareCheck />
                Cancelados
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="pendientes">Acá renderizamos los pedidos pendientes</Tabs.Content>
            <Tabs.Content value="completados">Acá renderizamos los pedidos completados </Tabs.Content>
            <Tabs.Content value="cancelados">Acá renderizamos los pedidos cancelados</Tabs.Content>
          </Tabs.Root>
        )}
      </For>
  )
}